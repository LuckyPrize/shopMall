<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommand></Recommand>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(c, index) in floorList" :key="index" :list="c"></Floor>
    <brand></brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommand from "@/pages/Home/Recommand";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style>
</style>