// import { useReducer } from "react";

// const formReducer = (calculatorInput, action) => {
//   switch (action.type) {
//     case "input-change": {
//       const { groupKey, paramKey, value } = action.payload;
//       return {
//         ...calculatorInput,
//         form: {
//           ...calculatorInput.form,
//           [groupKey]: {
//             ...calculatorInput.form[groupKey],
//             [paramKey]: value,
//           },
//         },
//       };
//     }

//     case "select-input": {
//       const { groupKey, paramKey, value } = action.payload;
//       return {
//         ...calculatorInput,
//         form: {
//           ...calculatorInput.form,
//           [groupKey]: {
//             ...calculatorInput.form[groupKey],
//             [paramKey]: "",
//           },
//         },
//         ui: {
//           ...calculatorInput.ui,
//           selectQueries: {
//             ...calculatorInput.ui.selectQueries,
//             [groupKey]: {
//               ...calculatorInput.ui.selectQueries[paramKey],
//               [paramKey]: value,
//             },
//           },
//         },
//       };
//     }

//     case "option-select": {
//       const { groupKey, paramKey, option } = action.payload;

//       if (!option) {
//         return calculatorInput;
//       }

//       const newGroup = {
//         ...calculatorInput.form[groupKey],
//         [paramKey]: option.key,
//       };

//       if (Object.prototype.hasOwnProperty.call(option, "price")) {
//         newGroup.price = option.price ?? "";
//       }

//       return {
//         ...calculatorInput,
//         form: {
//           ...calculatorInput.form,
//           [groupKey]: newGroup,
//         },
//         ui: {
//           selectQueries: {
//             ...calculatorInput.ui.selectQueries,
//             [groupKey]: {
//               ...calculatorInput.ui.selectQueries[paramKey],
//               [paramKey]: option.label,
//             },
//           },
//         },
//       };
//     }
//     default:
//       return calculatorInput;
//   }
// };

// const useCalculatorInput = () => {
//   const [formState, dispatch] = useReducer(formReducer, {
//     form: {
//       nitrogen: { soilValue: "", fertilizer: "", price: "" },
//       phosphorus: { soilValue: "", fertilizer: "", price: "" },
//       potassium: { soilValue: "", fertilizer: "", price: "" },
//       field: { area: "", crop: "", harvest: "" },
//     },
//     ui: {
//       selectQueries: {
//         nitrogen: { fertilizer: "" },
//         phosphorus: { fertilizer: "" },
//         potassium: { fertilizer: "" },
//         field: { crop: "" },
//       },
//     },
//   });

//   const onInputChange = (groupKey, paramKey, value) => {
//     dispatch({ type: "input-change", payload: { groupKey, paramKey, value } });
//   };

//   const onSelectInput = (groupKey, paramKey, value) => {
//     dispatch({
//       type: "select-input",
//       payload: {
//         groupKey,
//         paramKey,
//         value,
//       },
//     });
//   };

//   const onSelectOption = (groupKey, paramKey, option) => {
//     dispatch({
//       type: "option-select",
//       payload: {
//         groupKey,
//         paramKey,
//         option,
//       },
//     });
//   };

//   return {
//     formState,
//     onInputChange,
//     onSelectInput,
//     onSelectOption,
//   };
// };

// export default useCalculatorInput;
