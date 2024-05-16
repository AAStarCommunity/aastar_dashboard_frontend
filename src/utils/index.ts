interface FormItem {
  name: string;
  defaultValue?: any; // 根据实际情况修改类型
}

export function mergeLoadedFields<T extends FormItem>(
  formArr: Array<T>,
  data: { [key: string]: any }
): Array<T> {
  const names: string[] = formArr.map((item) => item.name);
  const newArr = [...formArr];

  names.forEach((item, index) => {
    if (data.hasOwnProperty(item)) {
      newArr[index] = {
        ...newArr[index],
        defaultValue: data[item],
      };
    }
  });

  return newArr;
}
