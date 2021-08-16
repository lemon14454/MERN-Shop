import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "名稱不能小於3個字元")
    .max(10, "名稱不能超過10個字元")
    .required("名稱欄位不可為空"),
  password: Yup.string()
    .min(6, "密碼不可小於6個字元")
    .required("密碼欄位不可為空")
    .matches(/^[a-zA-Z0-9]{6,}$/, "密碼長度至少6個字元，不可包含特殊符號"),
  password2: Yup.string().test("密碼一致", "密碼不一致", function (value) {
    return this.parent.password === value;
  }),
  email: Yup.string().email("錯誤的信箱格式").required("信箱欄位不可為空"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("錯誤的信箱格式").required("信箱欄位不可為空"),
  password: Yup.string().required("密碼欄位不可為空"),
});

export const UpdateProfile = Yup.object().shape({
  name: Yup.string()
    .min(3, "名稱不能小於3個字元")
    .max(10, "名稱不能超過10個字元")
    .required("名稱欄位不可為空"),
  email: Yup.string().email("錯誤的信箱格式").required("信箱欄位不可為空"),
  password: Yup.string()
    .min(6, "密碼不可小於6個字元")
    .matches(/^[a-zA-Z0-9]{6,}$/, "密碼長度至少6個字元，不可包含特殊符號"),
  password2: Yup.string().test("密碼一致", "密碼不一致", function (value) {
    return this.parent.password === value;
  }),
});

export const ShippingAddress = Yup.object().shape({
  address: Yup.string().required("地址不能為空"),
  city: Yup.string().required("城市不能為空"),
  postalCode: Yup.string().required("郵遞區號不能為空"),
  country: Yup.string().required("國家不能為空"),
});
