import BorrowRequestsTableClient from '@/components/admin/borrow-requests-table-client';

const borrowRequests: BorrowRequestsRow[] = [
  {
    id: '1',
    bookTitle: 'HTML and CSS: Design and Build Websites',
    coverUrl:
      '/books/covers/HTML_and_CSS__Design_and_Build_Websites_QOjLRAOI1F.jpg',
    fullName: 'Darrell Steward',
    coverColor: '#3a2931',
    email: 'steward@gmail.com',
    borrowedDate: new Date('2025-02-17 02:52:05.891374+00'),
    returnDate: null,
    dueDate: new Date('2025-02-22'),
    status: 'PENDING',
  },
  {
    id: '2',
    bookTitle: 'Fullstack React: The Complete Guide to ReactJS and Friends',
    coverUrl:
      '/books/covers/Fullstack_React__The_Complete_Guide_to_ReactJS_and_Friends_3e3FZRC6l.jpg',
    fullName: 'Darrell Steward',
    coverColor: '#eac8bf',
    email: 'steward@gmail.com',
    borrowedDate: new Date('2025-02-21 01:22:50.466387+00'),
    returnDate: null,
    dueDate: new Date('2025-02-24'),
    status: 'RETURNED',
  },
  {
    id: '3',
    bookTitle: 'JavaScript: The Good Parts',
    coverUrl: '/books/covers/JavaScript__The_Good_Parts_15SMQ3LrBR.jpg',
    fullName: 'Darrell Steward',
    coverColor: '#00a199',
    email: 'steward@gmail.com',
    borrowedDate: new Date('2025-02-21 02:20:18.532003+00'),
    returnDate: null,
    dueDate: new Date('2025-02-27'),
    status: 'REJECTED',
  },
  {
    id: '4',
    bookTitle: 'The Midnight Library',
    coverUrl: '/books/covers/81J6APjwxlL_jYimn0dLb.webp',
    fullName: 'Darrell Steward',
    coverColor: '#1c1f40',
    email: 'steward@gmail.com',
    borrowedDate: new Date('2025-02-21 01:28:49.89061+00'),
    returnDate: null,
    dueDate: new Date('2025-02-28'),
    status: 'BORROWED',
  },
];
export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <BorrowRequestsTableClient borrowRequests={borrowRequests} />;
}
