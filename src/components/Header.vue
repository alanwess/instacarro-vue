<template>
  <div class="header">
    <div class="img-logo"><img src="@/assets/logo.png" alt="Logo Instacarro" /></div>
    <div class="tel-info">
      <img src="@/assets/phone.svg" alt="Telefone" />
      <span>(11) 3569 - 3465</span>
    </div>
    <div class="box-user">
      <div class="user-info">
        <img src="@/assets/user.svg" :alt="user" />
        <span>{{ user }}</span>
      </div>
      <img class="detalhes" src="@/assets/caret.png" alt="Detalhes" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      user: String
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    padding-left: 25px;
    padding-right: 25px;
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .tel-info {
    display: none;
  }

  .img-logo {
    width: 100%;
    display: flex;
    align-items: center;
    
cursor: pointer;
    }

  .box-user {
    display: flex;
    justify-content: flex-end;
  }

  .user-info {
    height: 80px;
    width: 200px;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .user-info > img {
    height: 40px;
    margin-top: 10px;
    cursor: pointer;
    }

  .detalhes {
    height: 5px;
    margin-top: 5px;
    margin-left: -15px;
  }

  @media only screen and (min-width: 601px) and (max-width: 768px) {
    .header {
        padding-left: 50px;
        padding-right: 50px;
    }
  }

  @media only screen and (min-width: 769px) {
    .header {
      padding-left: 100px;
      padding-right: 100px;
      grid-template-columns: 25% 55% 20%;
    }

    .tel-info {
      display: flex;
      border-left: 2px solid rgb(211, 211, 211, 0.4);
      padding-left: 60px;
      display: flex;
      align-items: center;
    }

    .tel-info > img {
      height: 40px;
      margin-right: 15px;
    }
    
    .tel-info span {
      font-weight: bold;
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 600px){
    .img-logo img {
      width: 90%;
    }
  }
</style>
