import { useState } from "react";
import stateData from "../data/state&cities.json";
import { FormSteps, ShippingInfo } from "../helpers/types";
import { useCheckout, useFormStep, useShippingForm } from "../hooks/hooks";
import { address, name, phone, zipCode } from "../utils/regex";
import { useForm, Controller, FieldValue, FieldValues } from "react-hook-form";
import { Input } from "./Input";
import Select from "react-select";

export function Shipping() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onTouched" });
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const states = Object.keys(stateData).map((state) => {
    return { value: state, label: state };
  });
  const selectedShipping = watch("selectedShipping");
  const { formStep, incrementFormStep } = useFormStep();
  const { updateShippingInfo } = useShippingForm();
  const nextSteps: any = {
    [FormSteps.CART]: "Shipping",
    [FormSteps.SHIPPING]: "Payment",
    [FormSteps.PAYMENT]: "Summary",
  };

  const shippingInputs = [
    {
      name: "addressTitle",
      type: "text",
      label: "Address Title *",
      info: "",
      validations: {
        required: "This field is required.",
        pattern: name,
      },
    },
    {
      name: "fullName",
      type: "text",
      label: "Full Name *",
      info: "",
      validations: {
        required: "This field is required.",
        pattern: name,
      },
    },
    {
      name: "address",
      type: "text",
      label: "Address *",
      info: "",
      validations: {
        required: "This field is required.",
        pattern: address,
      },
    },
    {
      name: "postalCode",
      type: "text",
      label: "Postal Code *",
      info: "",
      validations: {
        required: "This field is required.",
        pattern: zipCode,
      },
    },
    {
      name: "country",
      type: "select",
      label: "Country *",
      options: [{ value: "US", label: "United States" }],
      validations: {
        required: "This field is required.",
      },
    },
    {
      name: "state",
      type: "select",
      label: "State *",
      options: states,
      validations: {
        required: "This field is required.",
      },
    },
    {
      name: "city",
      type: "select",
      label: "City *",
      options: cities,
      validations: {
        required: "This field is required.",
      },
    },
    {
      name: "cellPhone",
      type: "text",
      label: "Cell Phone *",
      info: "",
      validations: {
        required: "This field is required.",
        pattern: phone,
      },
    },
    {
      name: "telephone",
      type: "text",
      label: "Telephone",
      info: "",
      validations: {
        pattern: phone,
      },
    },
  ];

  const shippingMethods = [
    {
      name: "standard",
      label: "Standard",
      price: 5.99,
      info: "3-5 business days (Free over $100)",
    },
    {
      name: "express",
      label: "Express",
      price: 14.99,
      info: "1-2 business days",
    },
  ];

  return (
    <div className="overflow-y-scroll pb-4">
      <h2 className="text-2xl font-medium py-2 border-b-2">
        SHIPPING INFORMATION
      </h2>
      <form onSubmit={handleSubmit((data) => updateShippingInfo(data))}>
        <div className="grid grid-cols-3 gap-2 flex-wrap border-b-2 py-2">
          {shippingInputs.map((input) => {
            if (input.type === "select") {
              return (
                <div key={input.name} className="capitalize">
                  <Controller
                    control={control}
                    name={input.name}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Select
                        name={input.name}
                        value={value}
                        options={input.options}
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange && onChange(e);
                          if (input.name === "state") {
                            const citiesArray: string[] =
                              stateData[e.value as keyof typeof stateData];
                            setCities(
                              citiesArray.map((city) => ({
                                value: city.toLowerCase(),
                                label: city.toLowerCase(),
                              }))
                            );
                          }
                        }}
                      />
                    )}
                  ></Controller>
                </div>
              );
            }
            return (
              <div key={input.name} className="col-span-3">
                <Input input={input} register={register} errors={errors} />
              </div>
            );
          })}
        </div>
        <h3 className="text-xl font-medium p-2">SHIPPING METHOD</h3>
        <div>
          <div>
            {shippingMethods.map((method) => {
              return (
                <label key={method.name} className="flex gap-4">
                  <input
                    {...register("selectedShipping", {
                      required: "This field is required.",
                    })}
                    type="radio"
                    value={method.name}
                    checked={selectedShipping === method.name}
                    onChange={(e) => {
                      setValue("selectedShipping", e.target.value);
                    }}
                  />
                  <div>
                    <h4 className="font-medium">{method.label}</h4>
                    <p>{method.info}</p>
                  </div>
                </label>
              );
            })}
            {/* <p className="text-red-500 my-1">
              {errors["selectedShipping"]?.message}
            </p> */}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-4 pb-4 flex justify-center items-center mt-8 text-white text-lg font-medium">
          <button className="flex px-16 py-3 bg-black rounded-full transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none">
            Proceed to {nextSteps[formStep]}
          </button>
        </div>
      </form>
    </div>
  );
}
