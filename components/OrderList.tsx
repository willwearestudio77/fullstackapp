// import { useUser } from "@auth0/nextjs-auth0/client";
import { useProducts } from "@/lib/tq/orders/queries";
// import { useAddToBasket } from "@/lib/tq/baskets/mutations";
import { List, ListItem } from "@/components/mui";
import Product from "@/components/Product";
import Paragraph from "@/components/Paragraph";

const OrderList = ({
  deleteHandler = () => {},
  headingLevel = 2,
  canUpdate = false,
  canRemove = false,
  canBuy = true,
}) => {
//   const { user } = useUser();
//   const mutation = useAddToBasket();

  const { data: orders } = useProducts();
  if (!orders || !orders.length) return <Paragraph>No orders to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {orders.map((order:any) => (
        <ListItem key={order._id} component="li">
          <Product
            order={order}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
            canUpdate={canUpdate}
            canRemove={canRemove}
            // canBuy={!!user && canBuy}
            // addToBasket={() => mutation.mutate(order._id)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default OrderList;
