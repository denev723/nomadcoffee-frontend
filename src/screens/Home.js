import { isLoggedInVar } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { logUserOut } from "../apollo";

const Container = styled.div``;

const Header = styled.div``;

const SEE_COFFEESHOPS_QUERY = gql`
  query coffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      longitude
      latitude
      categories {
        name
      }
      photos {
        url
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(SEE_COFFEESHOPS_QUERY);
  return (
    <Container>
      <Header>
        <button onClick={logUserOut}>Logout</button>
      </Header>
      <ul>
        {data?.seeCoffeeShops?.map((coffeeShop) => (
          <li key={coffeeShop.id}>
            <p>{coffeeShop.name}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Home;
