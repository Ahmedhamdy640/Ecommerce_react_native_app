import { ActivityIndicator, Text } from "react-native";
import React from "react";
import { useCategory, useDeleteCategoryProduct } from "../../hooks/useCategory";

import { TopTabScreenProps } from "../../navigation/types";
import { ProductList } from "../../components/ProductList";

const Category: React.FC<TopTabScreenProps<"Smartphones">> = () => {
  const { data, isLoading, error, refetch } = useCategory();
  const { mutateAsync: deleteProduct } = useDeleteCategoryProduct();

  const header = () => (
    <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
      Smartphones
    </Text>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {error.message}
      </Text>
    );
  }

  return (
    <ProductList
      ListHeaderComponent={header}
      products={data?.products || []}
      refreshing={isLoading}
      onRefresh={refetch}
      deleteProduct={deleteProduct}
    />
  );
};

export default Category;
