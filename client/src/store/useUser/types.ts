type UserContext = {
  user: MaybeEmpty<User>
  setUser: StateSetter<MaybeEmpty<User>>
  isFetchingUser: boolean
  setIsFetchingUser: StateSetter<boolean>
}