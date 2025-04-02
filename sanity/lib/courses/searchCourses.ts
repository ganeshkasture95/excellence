import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function searchCourses(term: string) {

  // this is a grock query 
  // it is a query language for Sanity.io, a headless CMS
  // it is similar to GraphQL but more flexible and powerful
  // it allows you to query and manipulate data in a more expressive way
  
  const searchQuery = defineQuery(`*[_type == "course" && (
    title match $term + "*" ||
    description match $term + "*" ||
    category->name match $term + "*"
  )] {
    ...,
    "slug": slug.current,
    "category": category->{...},
    "instructor": instructor->{...}
  }`);

  // 

  const result = await sanityFetch({
    query: searchQuery,
    params: { term },
  });

  return result.data || [];
}
