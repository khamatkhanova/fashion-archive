interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  route: string;
}

export function createPaginationLinks({page, limit, total, route}: PaginationOptions) {
  const links: string[]=[];
  const lastPage = Math.ceil(total/limit);

  if (page>1) {
    links.push(`<${route}?page=${page - 1}&limit=${limit}>; rel="prev"`);
  }
  if (page < lastPage) {
    links.push(`<${route}?page=${page + 1}&limit=${limit}>; rel="next"`);
  }

  links.push(`<${route}?page=1&limit=${limit}>; rel="first"`);
  links.push(`<${route}?page=${lastPage}&limit=${limit}>; rel="last"`);
  return links.join(', ');
}