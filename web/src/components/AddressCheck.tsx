import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { lastStep, nextStep, selectCart, setAddress } from "../redux/cart";
import { ShippingAddress } from "../util/validations";
import CheckoutComponent from "./CheckoutComponent";

const AddressCheck = () => {
  const dispatch = useAppDispatch();
  const { shippingAddress } = useAppSelector(selectCart);

  return (
    <CheckoutComponent title="運送地址">
      <Formik
        initialValues={{
          address: shippingAddress?.address,
          city: shippingAddress?.city,
          postalCode: shippingAddress?.postalCode,
          country: shippingAddress?.country,
        }}
        validationSchema={ShippingAddress}
        onSubmit={(value, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(setAddress({ address: value }));
          dispatch(nextStep());
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          touched,
        }) => (
          <Form onSubmit={handleSubmit} className="w-full">
            <input
              className="user-form-input"
              type="text"
              name="address"
              placeholder="請輸入地址"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
            <p className="user-form-error">
              {errors.address && touched.address && errors.address}
            </p>

            <input
              className="user-form-input"
              type="text"
              name="city"
              placeholder="請輸入城市"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
            />
            <p className="user-form-error">
              {errors.city && touched.city && errors.city}
            </p>

            <input
              className="user-form-input"
              type="text"
              name="postalCode"
              placeholder="請輸入郵遞區號"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.postalCode}
            />
            <p className="user-form-error">
              {errors.postalCode && touched.postalCode && errors.postalCode}
            </p>

            <input
              className="user-form-input"
              type="text"
              name="country"
              placeholder="請輸入所在國家"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
            />
            <p className="user-form-error">
              {errors.country && touched.country && errors.country}
            </p>

            <div className="flex mt-12 justify-between">
              <button
                onClick={() => dispatch(lastStep())}
                className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
              >
                上一步
              </button>
              <button
                type="submit"
                className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
                disabled={isSubmitting}
              >
                下一步
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CheckoutComponent>
  );
};

export default AddressCheck;
