import { Empty } from "antd";
export default function EmptyState({ title, description, children }) {
  return (
    <section className="card empty">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <>
            <h3>{title}</h3>
            <p className="mt8">{description}</p>
          </>
        }
      >
        {children && <div className="mt24">{children}</div>}
      </Empty>
    </section>
  );
}
