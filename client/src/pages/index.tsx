import * as React from "react";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { TextStyle, Page, Layout, EmptyState } from "@shopify/polaris";
import { SelectPayload } from "@shopify/app-bridge-react/components/ResourcePicker/ResourcePicker";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => {
  const [open, setOpen] = React.useState(false);

  const handleSelection = (resources: SelectPayload) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    console.log(idsFromResources);
    setOpen(false);
  };

  return (
    <Page>
      <TitleBar
        title="Sample App"
        primaryAction={{
          content: "Select Products",
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={handleSelection}
        onCancel={() => setOpen(false)}
      />
      <Layout>
        <TextStyle variation="positive">
          Sample app using React and Next.js
        </TextStyle>
        <EmptyState
          heading="Discount your products temporarily"
          action={{
            content: "Select Products",
            onAction: () => setOpen(true),
          }}
          image={img}
        ></EmptyState>
      </Layout>
    </Page>
  );
};

export default Index;
