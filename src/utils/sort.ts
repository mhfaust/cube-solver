type ComparableType = string | Date | number | bigint | boolean | null | undefined;

export type SortValueSelector<T> = (i: T) => ComparableType;
export type CompareFunction<T> = (a: T, b: T) => number;

/**
 * Creates a comparator function for sorting an array of items based on a selected value.
 *
 * @template T - The type of the items in the array to be sorted.
 * @param selector - A function that selects the value to sort by from each item.
 * @param order - The sorting order, either 'ASC' for ascending or 'DESC' for descending. Defaults to 'ASC'.
 * @returns A comparator function that can be used with array sorting methods.
 *
 * @example
 * ```typescript
 * const items = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
 * const sorted = items.sort(by(item => item.name, 'ASC'));
 * console.log(sorted); // [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]
 * ```
 */
export const by = <T>(selector: SortValueSelector<T>, order: 'asc' | 'desc' = 'asc') => {
  return (itemA: T, itemB: T) => {
    //type as any because TS says we can't compare things with undefined and null.
    //but JS allows it, and it works for natural sorting.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let a = selector(itemA) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let b = selector(itemB) as any;

    if (typeof a === 'string') a = a.toLowerCase();
    if (typeof b === 'string') b = b.toLowerCase();

    const val =
      a > b ? 1
      : a < b ? -1
      : 0;
    return order === 'asc' ? val : val * -1;
  };
};

/**
 * Creates a comparison function that sorts elements in ascending order based on a selector function.
 *
 * @template T - The type of the elements to be compared.
 * @param selector - A function that extracts the value to be used for sorting from an element.
 * @returns A comparison function that can be used to sort elements in ascending order.
 */
export const byAscending = <T>(selector: SortValueSelector<T>): CompareFunction<T> =>
  by(selector, 'asc');

/**
 * Creates a comparison function that sorts elements in descending order
 * based on the value returned by the provided selector function.
 *
 * @template T - The type of the elements to be compared.
 * @param selector - A function that extracts the value to sort by from an element.
 * @returns A comparison function that can be used to sort elements in descending order.
 */
export const byDescending = <T>(selector: SortValueSelector<T>): CompareFunction<T> =>
  by(selector, 'desc');

/**
 * Combines multiple comparison functions into a single comparison function.
 * The returned function will evaluate the provided comparison functions in order,
 * stopping as soon as one of them returns a non-zero value.
 *
 * @template T - The type of the items being compared.
 * @param sorters - An array of comparison functions to be applied in sequence.
 * Each comparison function should return:
 * - A negative number if the first item is less than the second.
 * - Zero if the items are equal.
 * - A positive number if the first item is greater than the second.
 * @returns A combined comparison function that applies the provided sorters in sequence.
 */
export const onMultipleFields = <T>(...sorters: CompareFunction<T>[]) => {
  return (itemA: T, itemB: T) => {
    let val = 0;
    let i = 0;
    while (val === 0 && i < sorters.length) {
      val = sorters[i](itemA, itemB);
      i++;
    }
    return val;
  };
};

/**
 * Generates a sorting function that sorts items based on a custom order of values. Expects a selector function that returns
 * values that are in the order list.
 * @param selector: a function of the generic type that returns the value that items should be sorted on
 * @param order: Array of values representing the order that items should be sorted by
 * @param placeListedItems: 'first' | 'last' - where to place items found in the list relative to those not found in the list
 * @returns: a comparer function to be used by an array.sort call.
 */
export const byCustomOrder = <TData, TFieldValue extends ComparableType>(
  selector: (d: TData) => TFieldValue,
  order: TFieldValue[],
  placeListedItems: 'first' | 'last' = 'first',
): CompareFunction<TData> => {
  const orderMap = new Map(order.map((v, i) => [v, i]));
  return (a: TData, b: TData) => {
    const aIndex = orderMap.get(selector(a));
    const bIndex = orderMap.get(selector(b));
    if (aIndex === undefined && bIndex === undefined) {
      return 0;
    }
    if (aIndex === undefined) {
      return placeListedItems === 'last' ? -1 : 1;
    }
    if (bIndex === undefined) {
      return placeListedItems === 'last' ? 1 : -1;
    }
    return aIndex - bIndex;
  };
};
