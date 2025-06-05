const express = require("express");
const admin = require("firebase-admin");
const productData = [
  {
    name: "Slim Fit Jeans",
    price: 40,
    description:
      "Stylish slim fit jeans with a comfortable stretch for everyday wear.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/jean/j/g/x/32-kjo-90725-slm-slmft-bk-killer-original-imah8766zycrw3xh.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Men's Casual Shirt",
    price: 30,
    description:
      "A lightweight casual shirt for men, perfect for both work and play.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/shirt/o/g/i/xxl-deu017-deneeja-original-imah7v6ea6rfffxx.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Women's High Heel Shoes",
    price: 70,
    description:
      "Elegant high heel shoes for women, ideal for evening events and parties.",
    image_uri:
      "https://rukminim2.flixcart.com/image/430/516/xif0q/shoe/z/i/q/4-lbw-18-black-37-gardin-black-original-imagu2parz6j3yzh.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Men's Winter Coat",
    price: 150,
    description:
      "A warm and stylish winter coat designed to keep you comfortable and fashionable.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/coat/a/i/o/xl-dlnxmcoat26black-chkokko-original-imah5f88ztuw4g9h.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Women's Leather Handbag",
    price: 100,
    description: "A sleek leather handbag for women, perfect for any occasion.",
    image_uri:
      "https://rukminim2.flixcart.com/image/430/516/xif0q/backpack/f/y/5/9-ember-13-ember19sbfmt-laptop-backpack-genie-36-19-original-imagyg9jrmn9huhg.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Men's Jogger Pants",
    price: 40,
    description:
      "Comfortable and sporty jogger pants, perfect for workouts or casual outings.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/trouser/p/h/u/28-maroon-simpale-erenchino-original-imah7sjkvbhqbget.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Women's Wool Scarf",
    price: 25,
    description:
      "A soft wool scarf that adds warmth and style to any winter outfit.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/scarf/2/a/e/free-size-wool-women-s-cold-weather-scarves-wraps-pack-of-1-blue-original-imagt3zfukagxh4g.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Men's Sporty Sneakers",
    price: 80,
    description:
      "Durable and lightweight sneakers designed for sports and active wear.",
    image_uri:
      "https://rukminim2.flixcart.com/image/430/516/kr6oeq80/shoe/t/n/o/10-kc043-blu-k-footlance-blue-original-imag5ffhftjgga9s.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Men's Denim Jacket",
    price: 70,
    description:
      "A classic denim jacket that pairs well with almost any outfit.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/jacket/c/y/6/l-no-kttmensdenimjacket165-kotty-original-imagx8t9vex57f3u.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Women's Floral Dress",
    price: 55,
    description:
      "A beautiful floral dress ideal for spring and summer, featuring a flattering fit.",
    image_uri:
      "https://rukminim2.flixcart.com/image/536/644/xif0q/dress/q/7/4/xxl-dd-076-bottle-green-drape-and-dazzle-original-imagt4szwnaxhf7s.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
  {
    name: "Men's Sneakers",
    price: 75,
    description:
      "Comfortable and trendy sneakers, suitable for daily wear and sports.",
    image_uri:
      "https://rukminim2.flixcart.com/image/430/516/xif0q/shoe/r/q/b/9-100-corsac-black-original-imagzx8vhacynhcy.jpeg?q=60&crop=false",
    ar_uri: null,
    category: "Fashion",
  },
];


admin.initializeApp({
  credential: admin.credential.cert({

    "type": "service_account",
    "project_id": "portfolio-34240",
    "private_key_id": "ebd1236e4233d677eec6c68decacd46f551e36c8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD594aO05Bjmj15\nLDlvzpbw1yN38Auxe7xIM4glPieFvMj8DvNmc258+fa4F2adCRu/Ss6tiQdhZLiS\nMj52Az6rjeKoaoHM9+do3XcC6meOkf/HFmf8TfP6rFUMnIMFD7xzzBydH/AQ14I1\nhT7eIurHUHNX8ngP/N2I8STrbKq8ZtYunjX1p5M4TU/bMzThPb2OyCPQeaQlwFZ7\ntIIsyR0MTtUn5apDGz9lrbhBwkO0vUCb2o0gkmDW3UsTgeR0ZgTLa8VqJFduD5DC\nrdOFFxNAIBcE17Xac+ulbozYhhefbYUptLenczXk82rZkxEfzLE+NUepHuznt9Qy\nMUj+vsCFAgMBAAECggEAJpcTJpunhT5Q/T2u7wGVhesA0R8K/xnbhcixh7u3vaAu\nkH39D7UEZWDwY5f2lzR1HIF/tNocfJRgdkQxe7tL1+UDYqgcD+O5zb5bBY/gmum+\nniK/ElGKjV7rkRMx8FHEm0VIqZfo/QCjBoDipXKojPVw89k9YI0o5QpYKSGmnjJy\nr1xiNcL3u3bRR2VwWRNGKZDlaSjltB6efC18HdTt/4XsFuyUNA5UOFEyPzQSPv4h\nTG2khKfH9Y2PFnJQ3dsihE5MEP1+K36rWbqZnc5RItpj2NxWjV34YXhUKEV7SVAv\ncA/6X+129RmBMplSD5RhfEyapSjP3KymUjv2AGjYxQKBgQD+Z0hEJpBR26EX1z3j\n7/r2PbqSyB5ADVmhhGlMmAfs3Kfb0saFZIQqbk0XGaYS+2aBdzU2oZFyakKYYJBo\nfzVef7DSDzSXGPb0dJV/6kN+YEKsI1Yuv6CYG8D4nMn1CV2G2MzAibP2SPur7fCD\n8WJaMOSJXSHaeGjOug8S3AofnwKBgQD7iR2dnb0Mc9PH/QqAKzRGPKQZStxGm/tT\nWt4QkHO73DDDWYqD5a/HQ3e91LbVvEGHDP1dqFTgjv5sZGuNJGD1heEubcOevV7y\nRamE6J2loPM8U6gewdl222loQnl1OoYV3+dwk/R2SkFIlmdeoK1/w1Z0Yu0Y6IcB\nyVjIUp+dWwKBgGkYvc/5pnFKrDgvIVBC2YhUY/kzVtvbKAYDr4SG4e9GEMpNPtno\ndnkY7Bv46pS46tXdK0yQXofHwg81BTNGKgQJ+EAvK+in1Y2ThBc97fgNSD3Ys0fI\nvk1YWdXa38usvMhyU9POj1vVNrMGLvAzDhB4VlEw+kVIrPOKBaQi5sO9AoGAfC5G\na8ErSxGH9czsOTibNy3LCh2WQFnTq2RKC711FcLwZBE5vEJSFLsvS43Pshed9jGo\niGuJc8/EtfihzG2wXKZ69HQGRsFRNaTEuzQoWFPsodTfREgJt489K9bdpc190yDW\nXxL8dsXUEyUF5YbIATKL5SvNyCVMOcqQxV1dJc8CgYEA+3ua3bzWZ6q3X6NGJUWj\n7WRuNZDfK1JQAs8/lY6CkFfqwMWcompCfNFFwyYpfpPYR7FpYTsyqnKyGYYgfSP6\nfbDpaT3bhFEtnKhDHtOdoqRkhyOmG3+7Yjt8jZL/0obf10QwJpgdj9kRd2DE6m+i\nLzS8+C5K1PkuuPLKbnA2ixQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-gzjf3@portfolio-34240.iam.gserviceaccount.com",
    "client_id": "106629072240831202269",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gzjf3%40portfolio-34240.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }

  ),
});

const db = admin.firestore();
const app = express();
const PORT = 3000;

app.post("/insert-categories", async (req, res) => {
  const batch = db.batch();
  const collectionRef = db.collection("products");

  try {
    productData.forEach((category) => {
      const docRef = collectionRef.doc();
      batch.set(docRef, category);
    });

    await batch.commit();
    res.send("Categories inserted successfully!");
  } catch (error) {
    console.error("Error inserting categories:", error);
    res.status(500).send("Error inserting data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
