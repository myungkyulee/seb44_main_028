import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import ItemCardList from '../../../common/components/ItemCard/ItemCardList';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import { ITEMCARD_DATA } from '../constants';

// export type ItemCardProps = {
//   id: string;
//   title: string;
//   baseFee: number;
//   feePerDay: number;
//   overdueFee: number;
//   content: string;
//   minimumRentalPeriod: number;
//   category: number[];
//   location: string;
//   minRental: number;
//   imageUrl: string;
// };

function WishList() {
  const [items, setItems] = useState(ITEMCARD_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    // 서버에 API 요청을 보내는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://playpack.shop/api/members/interests/',
          { params: { memberId: 1 } },
        ); // 실제 API 엔드포인트에 맞게 수정
        console.log(response.data);
        console.log(items);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchData(); // API 데이터 가져오기 함수 호출
  }, []);

  // 현재 페이지에 해당하는 아이템을 가져오는 함수
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // return ITEMCARD_DATA.slice(startIndex, endIndex);
    // console.log(startIndex, endIndex);
    // console.log(items.slice(startIndex, endIndex));
    // console.log('items', items);
    // return items.slice(startIndex, endIndex);
    return items;
  };
  // 페이지 변경 시 호출되는 함수
  const handelPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {/* {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))} */}
      {/* <ItemCardList
        itemCardListTitle="관심목록"
        itemCardListContentData={getCurrentItems()}
      /> */}
      <ItemCardList
        itemCardListTitle="관심목록"
        itemCardListContentData={
          Array.isArray(getCurrentItems()) ? getCurrentItems() : []
        }
      />

      <Paging
        currentPage={currentPage}
        onPageChange={handelPageChange}
        itemsPerPage={itemsPerPage}
        totalItemsCount={items.length}
      />
    </div>
  );
}
export default WishList;
