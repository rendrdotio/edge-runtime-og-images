import { ImageResponse } from "next/og";

// Constants
import domain from "@/constants/general";
import posts from "@/content/posts.json";

export const runtime = "edge";

export const size = {
  height: 600,
  width: 900,
};

export const contentType = "image/png";

async function getPostFromParams({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const post = posts.find((post) => post.slug === slug);

  return post;
}
//
export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostFromParams({ params });

  // Fonts
  const interExtraBold = fetch(
    new URL("public/Inter-ExtraBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interRegular = fetch(
    new URL("public/Inter-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        className="Wrapper"
        style={{
          backgroundImage: `url("${domain}${post?.image}")`,
          backgroundSize: "900px 600px",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          height: 600,
          width: 900,
        }}
      >
        <div
          className="InfoPane"
          style={{
            background:
              "linear-gradient(163deg, #070707 0%, rgba(7, 7, 7, 0.52) 99.66%, rgba(7, 7, 7, 0.00) 100%)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            height: "100%",
            justifyContent: "space-between",
            padding: "87px 21px",
            width: "331px",
          }}
        >
          <div
            className="Title"
            style={{
              fontFamily: "InterExtraBold",
              fontSize: 42,
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: 0.953,
            }}
          >
            {post?.title}
          </div>
          <div
            className="MetaInfo"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 32,
            }}
          >
            <div className="MetaGroup" style={{ display: "flex" }}>
              <div
                className="MetaData"
                style={{
                  display: "flex", // was grid
                  flexWrap: "wrap",
                  //gridAutoRows: "auto",
                  //gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 16,
                }}
              >
                {post?.attributes.map((attribute, i) => {
                  return (
                    <div
                      key={`attribute-${i}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                        /* gridColumn:
                          i === post.attributes.length - 1 ? "1 / -1" : "unset", */
                        width:
                          i === post.attributes.length - 1 ? "100%" : "40%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginRight: "auto",
                          width: "auto", // these width and marginRight are to solve the fit-content problem below
                        }}
                      >
                        {attribute.label}
                        <div
                          className="MetaTitle"
                          style={{
                            backgroundImage: `url("${domain}/dot.svg")`,
                            // backgroundPosition: "left bottom",
                            backgroundRepeat: "repeat-x",
                            //backgroundSize: "7px 7px",
                            display: "flex",
                            flexDirection: "column",
                            fontFamily: "InterRegular",
                            fontSize: 16,
                            fontStyle: "normal",
                            fontWeight: 800,
                            lineHeight: "normal",
                            marginTop: "2px",
                            paddingBottom: "5px",
                            width: "auto", // fit-content not accepted
                          }}
                        ></div>
                      </div>

                      <div
                        className="MetaText"
                        style={{
                          fontFamily: "InterRegular",
                          fontSize: 16,
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: 1.2,
                        }}
                      >
                        {attribute.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          data: await interExtraBold,
          name: "InterExtraBold",
          style: "normal",
          weight: 800,
        },
        {
          data: await interRegular,
          name: "InterRegular",
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
