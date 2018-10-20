import React from "react";
import ContentLoader from "react-content-loader";
export default class TablePlaceholder extends React.Component {
  render() {
    return [1, 2, 3].map(item => (
      <tr key={item} className="table-row">
        <td className="padding-row center">
          <ContentLoader
            height={300}
            width={500}
            speed={1}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <circle cx="220" cy="150" r="108.36" />
          </ContentLoader>
        </td>
        {[1, 2, 3, 4].map(item => (
          <td key={item}>
            <ContentLoader
              height={40}
              width={500}
              speed={1}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="0" ry="0" width="479.42" height="30" />
            </ContentLoader>
          </td>
        ))}
      </tr>
    ));
  }
}
