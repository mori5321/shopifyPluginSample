import React from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField,
  TextStyle,
  SettingToggle,
} from "@shopify/polaris";

type State = {
  discount: string;
  enabled: boolean;
};

class AnnotatedLayout extends React.Component<{}, State> {
  state = {
    discount: "10%",
    enabled: false,
  };

  render() {
    const { discount, enabled } = this.state;
    const contentStatus = enabled ? "Disabled" : "Enabled";
    const textStatus = enabled ? "enabled" : "disabled";

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Default discount"
            description="Add a product to Sample App, it will automatically be discounted."
          >
            <Card sectioned>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <TextField
                    value={discount}
                    onChange={this.handleChangeDiscount}
                    label="Discount percentage"
                    type="text"
                  />
                  <Stack distribution="trailing">
                    <Button primary submit>
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Price updates"
            description="Temporarily disable all Sample App Price updates"
          >
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: this.handleToggle,
              }}
              enabled={enabled}
            >
              This setting is{" "}
              <TextStyle variation="strong">{textStatus}</TextStyle>
            </SettingToggle>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }

  handleSubmit = () => {
    this.setState({
      discount: this.state.discount,
    });
    console.log("submission", this.state);
  };

  handleChangeDiscount = (value: string) => {
    this.setState({ discount: value });
  };

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  };
  // handleChange = (field: any) => {
  //   return (value: any) => this.setState({ [field]: value });
  // };
}

export default AnnotatedLayout;
