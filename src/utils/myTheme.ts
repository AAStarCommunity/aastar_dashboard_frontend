const myTheme = {
  button: {
    primary: {
      // base: "text-white bg-aastar-600 border border-transparent focus:outline-none hover:bg-white hover-text-aastar-700 foucs:outline-0",
      base: "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all",
      active: "active:bg-aastar-600 hover:bg-aastar-700 focus:ring",
    },
  },
  input: {
    base: "block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md form-input",
    active:
      "focus:border-bule-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-bule-300",
  },
  textarea: {
    base: "block w-full p-2 text-sm dark:text-gray-300 rounded-md focus:outline-none",
    active:
      "focus:border-bule-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-bule-300",
  },
};

export default myTheme;
