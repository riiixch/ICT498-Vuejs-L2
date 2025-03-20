<script>
import Swal from "sweetalert2";
import api from "@/api";

export default {
    data() {
        return {
            customers: [],
            apiUrl: "/customer.php", // เปลี่ยนเป็น API จริงของคุณ
        };
    },
    methods: {
        async fetchCustomers() {
            try {
                const response = await api.get(this.apiUrl);
                this.customers = response.data.data;
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        },

        async addCustomer() {
            const { value: formData } = await Swal.fire({
                title: "เพิ่มลูกค้าใหม่",
                html: `
          <input id="swal-firstname" class="swal2-input" placeholder="ชื่อ">
          <input id="swal-lastname" class="swal2-input" placeholder="นามสกุล">
          <input id="swal-phone" class="swal2-input" placeholder="เบอร์โทร">
          <input id="swal-username" class="swal2-input" placeholder="ชื่อผู้ใช้">
          <input id="swal-password" type="password" class="swal2-input" placeholder="รหัสผ่าน">
        `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => ({
                    FirstName: document.getElementById("swal-firstname").value,
                    LastName: document.getElementById("swal-lastname").value,
                    PhoneNumber: document.getElementById("swal-phone").value,
                    Username: document.getElementById("swal-username").value,
                    Password: document.getElementById("swal-password").value,
                }),
            });

            if (formData) {
                try {
                    await api.post(this.apiUrl, formData);
                    Swal.fire("สำเร็จ", "เพิ่มลูกค้าเรียบร้อย", "success");
                    this.fetchCustomers();
                } catch (error) {
                    Swal.fire("ผิดพลาด", "ไม่สามารถเพิ่มลูกค้าได้", "error");
                }
            }
        },

        async editCustomer(customer) {
            const { value: formData } = await Swal.fire({
                title: "แก้ไขข้อมูลลูกค้า",
                html: `
          <input id="swal-firstname" class="swal2-input" placeholder="ชื่อ" value="${customer.FirstName}">
          <input id="swal-lastname" class="swal2-input" placeholder="นามสกุล" value="${customer.LastName}">
          <input id="swal-phone" class="swal2-input" placeholder="เบอร์โทร" value="${customer.PhoneNumber}">
          <input id="swal-username" class="swal2-input" placeholder="ชื่อผู้ใช้" value="${customer.Username}">
        `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => ({
                    CustomerID: customer.CustomerID,
                    FirstName: document.getElementById("swal-firstname").value,
                    LastName: document.getElementById("swal-lastname").value,
                    PhoneNumber: document.getElementById("swal-phone").value,
                    Username: document.getElementById("swal-username").value,
                }),
            });

            if (formData) {
                try {
                    const response = await api.put(this.apiUrl, formData);
                    Swal.fire("สำเร็จ", response.data.message, "success");
                    this.fetchCustomers();
                } catch (error) {
                    Swal.fire("ผิดพลาด", error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้", "error");
                }
            }
        },

        async deleteCustomer(id) {
            const result = await Swal.fire({
                title: "ยืนยันการลบ?",
                text: "คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลลูกค้านี้",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "ใช่, ลบเลย!",
                cancelButtonText: "ยกเลิก",
            });

            if (result.isConfirmed) {
                try {
                    await api.delete(this.apiUrl, { data: { CustomerID: id } });
                    Swal.fire("ลบสำเร็จ", "ข้อมูลลูกค้าถูกลบแล้ว", "success");
                    this.fetchCustomers();
                } catch (error) {
                    Swal.fire("ผิดพลาด", "ไม่สามารถลบลูกค้าได้", "error");
                }
            }
        },
    },
    mounted() {
        this.fetchCustomers();
    },
};
</script>
<template>
    <div class="min-vh-100">
        <div class="container mt-5 pt-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="text-primary">📋 รายชื่อลูกค้า</h2>
                <button class="btn btn-success shadow-sm" @click="addCustomer">
                    <i class="fas fa-plus"></i> เพิ่มลูกค้า
                </button>
            </div>

            <div class="table-responsive rounded shadow">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>เบอร์โทร</th>
                            <th>ชื่อผู้ใช้</th>
                            <th class="text-center">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(customer, index) in customers" :key="customer.CustomerID" class="table-row">
                            <td>{{ index + 1 }}</td>
                            <td>{{ customer.FirstName }}</td>
                            <td>{{ customer.LastName }}</td>
                            <td>{{ customer.PhoneNumber }}</td>
                            <td>{{ customer.Username }}</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm me-2 shadow-sm" @click="editCustomer(customer)">
                                    <i class="fas fa-edit"></i> แก้ไข
                                </button>
                                <button class="btn btn-danger btn-sm shadow-sm"
                                    @click="deleteCustomer(customer.CustomerID)">
                                    <i class="fas fa-trash"></i> ลบ
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.min-vh-100 {
    min-height: 100vh;
}

.table-row:hover {
    background-color: #f8f9fa;
    transition: background-color 0.3s ease;
}

.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
}
</style>