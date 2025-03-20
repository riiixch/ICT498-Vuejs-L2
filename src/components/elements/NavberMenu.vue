<script>
export default {
    name: 'NavberMenu',
}
</script>

<template>
    <div class="container-fluid fixed-top p-3 nav-bg">
        <div class="d-flex flex-row justify-content-center gap-3 fs-5">
            <router-link class="nav-item" to="/home"><i class="fa-regular fa-house me-2"></i>Home</router-link>
            <span>|</span>
            <router-link class="nav-item" to="/customer"><i class="fa-regular fa-user me-2"></i> Customer</router-link>
            <span>|</span>
            <router-link class="nav-item" to="/department"><i class="fa-regular fa-user-tie me-2"></i>Department</router-link>
        </div>
    </div>
</template>

<style scoped>
.nav-bg {
    background-color: whitesmoke;
}

.nav-item {
    color: rgb(126, 13, 202);
    text-decoration-line: none;
    font-weight: bold;
}

.nav-item:hover {
    color: rgb(169, 80, 229);
}
</style>