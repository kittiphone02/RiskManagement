const ListItem = ({ list }) => (
  <div className="flex flex-col gap-y-2">
    {list.map((event, index) => (
      <p key={event} className="flex">
        <span className="mr-1">{index + 1}.</span>
        <span className="text-sm text-gray-900 leading-5 font-lao">
          {event}
        </span>
      </p>
    ))}
  </div>
);

export default ListItem;
