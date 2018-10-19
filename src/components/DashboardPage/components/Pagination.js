import React from "react";

export default class Pagination extends React.Component {
  render() {
    const {page, list, setPage} = this.props;
    console.log(list.length)
    const pages = parseInt(list.length / 10);

    return <ul className="pagination">
      <li className="page-item">
        <span className={`page-link${page===1?' disabled':''}`} onClick={()=>setPage(page-1)}>
          Previous
        </span>
      </li>
      {Array.from(Array(pages).keys()).map(item => (
        <li className="page-item" key={item}>
          <span className={`page-link${page===item+1?' active':''}`} onClick={()=>setPage(item+1)}>{item + 1}</span>
        </li>
      ))}
      <li className="page-item">
        <span className={`page-link${page===pages?' disabled':''}`} onClick={()=>setPage(page+1)}>
          Next
        </span>
      </li>
    </ul>;
  }
}
