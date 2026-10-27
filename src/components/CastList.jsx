function CastList({ cast, limit = 5 }) {
    if (cast.length === 0) {
        return <p>Cast information is not available.</p>;
    }

    return (
        <div className="cast-list">
            <h4>Main Cast</h4>

            <ul>
                {cast.slice(0, limit).map((member) => (
                    <li key={member.person.id}>
                        {member.person.name}
                        {member.character?.name
                            ? ` as ${member.character.name}`
                            : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CastList;