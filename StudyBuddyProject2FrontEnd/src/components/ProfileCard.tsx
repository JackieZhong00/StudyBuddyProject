type ProfileCardProp  ={
    userResponse: string;
    label: string;
}
export const ProfileCard = ({ userResponse, label }: ProfileCardProp) => {
  return (
    <article className="card">
      <label htmlFor="contactInfo" className="card-label">
        {label}
      </label>

      <textarea defaultValue={userResponse} readOnly className="user-answers overflow-y-auto" />
    </article>
  )
}
