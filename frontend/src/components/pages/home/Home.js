import { Button } from "@chakra-ui/react";
import MainLayout from "../../layout/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      HomePage
      <div>
        <Button colorScheme="blue">Home</Button>
      </div>
    </MainLayout>
  );
}

export default HomePage;
