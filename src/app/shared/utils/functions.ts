export function sortByColumn(list: any[] | undefined, column: string, direction = 'desc'): any[] {
    return (list || []).sort((a,b)=>{
      if(a[column] > b[column]){
        return (direction === 'desc') ? 1 : -1;
      }
      if(a[column] < b[column]){
        return (direction === 'desc') ? -1 : 1;
      }
      return 0;
    })
}

export function isNil(value: any): boolean {
  return value === null || value === undefined;
}
