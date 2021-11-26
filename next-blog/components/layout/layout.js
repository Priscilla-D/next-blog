function Layout(props) {
  return (
    <Fagment>
      <MainNavigation />
      <main>{props.children}</main>∑
    </Fagment>
  );
}

export default Layout;
