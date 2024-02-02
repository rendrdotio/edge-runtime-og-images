type Attribute = {
  label: string;
  value: string;
};

type Post = {
  attributes: Attribute[];
  constructed: string;
  description: string;
  energyRating: string;
  features: string[];
  id: string;
  image: string;
  slug: string;
  title: string;
};

const post: Post = {
  attributes: [
    { label: "Location", value: "Salt Lake City" },
    { label: "Price", value: "$2,500,000" },
    { label: "Square ft.", value: "5,500" },
    { label: "Date listed", value: "2 hours ago" },
    {
      label: "About this property",
      value:
        "Prestigious stone estate, located on the hills overlooking the city, ideal for disconnecting from the chaos of the city without giving up any comfort.",
    },
  ],
  constructed: "2015",
  description:
    "Prestigious stone estate, located on the hills overlooking the city, ideal for disconnecting from the chaos of the city without giving up any comfort",
  energyRating: "A",
  features: ["pool", "panorama", "home-automation"],
  id: "4",
  image: "/article-4.jpg",
  slug: "panoramic-estate-in-the-heart-of-the-hills",
  title: "Panoramic estate in the heart of the hills",
};

export default function Page() {
  return (
    <div
      className="Wrapper"
      style={{
        backgroundImage: `url("${post.image}")`,
        color: "#fff",
        height: 506,
        width: 900,
      }}
    >
      <div
        className="InfoPane"
        style={{
          background:
            "linear-gradient(163deg, #070707 0%, rgba(7, 7, 7, 0.52) 99.66%, rgba(7, 7, 7, 0.00) 100%)",
          boxSizing: "border-box",
          flexShrink: 0,
          height: "506px",
          padding: "25px 21px",
          width: "331px",
        }}
      >
        <ListingTitle title={post.title} />
        <div
          className="MetaInfo"
          style={{
            marginTop: 32,
          }}
        >
          <MetaGroup post={post} />
        </div>
      </div>
    </div>
  );
}

const ListingTitle = ({ title }: { title: string }) => {
  return (
    <div
      className="Title"
      style={{
        fontFamily: "Inter",
        fontSize: 42,
        fontStyle: "normal",
        fontWeight: 800,
        lineHeight: 0.953,
      }}
    >
      {title}
    </div>
  );
};

const MetaGroup = ({ post }: { post: Post }) => {
  return (
    <div className="MetaGroup" style={{}}>
      <div
        className="MetaData"
        style={{
          display: "grid",
          gridAutoRows: "auto",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: 24,
        }}
      >
        {post.attributes.map((attribute, i) => {
          return (
            <div
              key={`attribute-${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 7,
                gridColumn:
                  i === post.attributes.length - 1 ? "1 / -1" : "unset",
              }}
            >
              <MetaTitle label={attribute.label} />
              <MetaText value={attribute.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MetaTitle = ({ label }: { label: string }) => {
  return (
    <div
      className="MetaTitle"
      style={{
        backgroundImage: "url(dot.svg)",
        backgroundPosition: "left bottom",
        backgroundRepeat: "repeat-x",
        backgroundSize: 7,
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 800,
        lineHeight: "normal",
        paddingBottom: 5,
        width: "fit-content",
      }}
    >
      {label}
    </div>
  );
};

const MetaText = ({ value }: { value: string }) => {
  return (
    <div
      className="MetaText"
      style={{
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: 1.2,
      }}
    >
      {value}
    </div>
  );
};
