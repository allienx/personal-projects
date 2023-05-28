export default function getSearchListItemProps(index: number) {
  return {
    id: `slist-${index}`,
    'data-list-index': index,
  }
}
