export function filterSerachCard(searchInputText, restaurantList) {
  const filterData = restaurantList.filter((restaurant) =>
    restaurant?.data?.data?.name
      ?.toLowerCase()
      .includes(searchInputText.toLowerCase())
  );
  return filterData;
}
