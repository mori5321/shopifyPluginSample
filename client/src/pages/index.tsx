import { TextStyle, Page, Layout, EmptyState } from "@shopify/polaris";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => (
  <div>
    <Page>
      <Layout>
        <TextStyle variation="positive">
          Sample app using React and Next.js
        </TextStyle>
        <EmptyState
          heading="Discount your products temporarily"
          action={{
            content: "Select Products",
            onAction: () => console.log("Clicked"),
          }}
          image={img}
        ></EmptyState>
      </Layout>
    </Page>
  </div>
);

export default Index;
