const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  option: { type: Schema.Types.ObjectId, ref: 'Option' },
  total: Number,
  startDate: Date,
  endDate: Date,
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: Date,
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true },
  personalId: { type: String, required: true },
  password: { type: String, required: true },
  roles: [String],
  subscriptions: [SubscriptionSchema],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
