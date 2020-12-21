import nextConnect from 'next-connect';
import User from '../../../models/User';
import { onError } from '../../../utils/error';
import { dbConnect, dbDisconnect } from '../../../utils/db';
import data from '../../../utils/data';
import Product from '../../../models/Product';

const handler = nextConnect({
  onError,
});
handler.get(async (req, res) => {
  await dbConnect();
  const seller = await User.findOne({ isSeller: true });
  if (seller) {
    const products = data.products.map((product) => ({
      ...product,
      seller: seller._id,
    }));
    const createdProducts = await Product.insertMany(products);
    await dbDisconnect();
    res.send({ createdProducts });
  } else {
    await dbDisconnect();
    res
      .status(500)
      .send({ message: 'No seller found. first run /api/users/seed' });
  }
});
export default handler;
