import React from "react";
import ContentLoader from "react-content-loader";
export default class TablePlaceholder extends React.Component {
  render() {
    return [1, 2, 3].map(item => (
      <tr key={item} className="table-row">
        <td className="padding-row center rating">
          <ContentLoader
            height={100}
            width={500}
            speed={1}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <circle cx="240" cy="50" r="50" />
          </ContentLoader>
        </td>
        {["padding-comment", "browser", "device", "platform", "details"].map(
          (item, index) => (
            <td key={index} className={item}>
              <ContentLoader
                height={30}
                width={600}
                speed={1}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <rect x="0" y="0" rx="0" ry="0" width="479.42" height="30" />
              </ContentLoader>
            </td>
          )
        )}
      </tr>
    ));
  }
}
