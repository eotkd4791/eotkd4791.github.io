import React from "react";

import { Link } from "gatsby";

import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useCategoriesList, useSiteMetadata } from "@/hooks";
import { toKebabCase } from "@/utils";

const CategoriesTemplate: React.FC = () => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Layout title={`Categories - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Categories">
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${toKebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default CategoriesTemplate;
