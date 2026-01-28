import mongoose, { Schema } from "mongoose";
import { UserType } from "../../types/index.type";
import bcrypt from "bcrypt";
import { USER_ROLE } from "../../contants/contant";

const userSchema = new Schema<UserType>(
  {
    fisrtName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
    favoriteProducts: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // tự  động thêm createAt và updateAt
  }
);

// hash  password trước  khi lưu
userSchema.pre("save", async function (next) {
  const user = this as UserType;
  // kiểm tra password có thay đổi gì hay không -> nếu không next
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// so sánh mật khẩu trước khi đăng nhập
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<UserType>("User", userSchema);
export default UserModel;
