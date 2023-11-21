<script setup>
const { logout } = useStrapiAuth();
onMounted(() => {
  logout();
  navigateTo("/");
});
</script>
