import { request, gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusiness = async (category) => {
  const query =
    gql`
    query GetBusiness {
      restaurants(where: { categories_some: { slug: "` +
    category +
    `" } }) {
        aboutUs
        address
        id
        name
        banner {
          url
        }
        restroType
        slug
        workingHours
        categories {
          name
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusinessDetail = async (businnessSlug) => {
  const query =
    gql`
    query RestaurantDetail {
      restaurant(where: { slug: "` +
    businnessSlug +
    `" }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const AddToCart = async (data) => {
  const query =
    gql`
    mutation AddToCart {
      createUserCart(
        data: {
          email: "` +
    data.email +
    `"
          price: ` +
    data.price +
    `
          projectDescription: "` +
    data.description +
    `"
          productImage: "` +
    data.productImage +
    `"
          productName: "` +
    data.name +
    `"
        }
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserCart = async (userEmail) => {
  const query =
    gql`
    query GetUserCart {
      userCarts(where: { email: "` +
    userEmail +
    `" }) {
        id
        price
        productImage
        productName
        projectDescription
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};
export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart,
};
