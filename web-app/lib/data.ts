const ITEMS_PER_PAGE = 10;
export async function fetchFilteredBooks(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const books = await 
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch books');
  }
}

export async function fetchBooksPages(query: string): Promise<number> {
  try {
    
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch total number of books.');
  }
}