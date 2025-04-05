function formatRupiah(element) {
    let value = element.value.replace(/[^0-9]/g, '');
    element.value = new Intl.NumberFormat("id-ID").format(value);
}

function calculateBudget() {
    let income = parseFloat(document.getElementById("income").value.replace(/\./g, ""));
    let utilities = parseFloat(document.getElementById("utilities").value.replace(/\./g, ""));
    let food = parseFloat(document.getElementById("food").value.replace(/\./g, ""));
    let debt = parseFloat(document.getElementById("debt").value.replace(/\./g, ""));
    let other = parseFloat(document.getElementById("other").value.replace(/\./g, ""));

    let totalExpenses = utilities + food + debt + other;
    let savings = income - totalExpenses;
    let labels = ["Air & Listrik", "Makan", "Cicilan", "Biaya Lain-lain"];
    let values = [utilities, food, debt, other];

    let ctx = document.getElementById("budgetChart").getContext("2d");
    if (window.budgetChart instanceof Chart) { window.budgetChart.destroy(); }
    window.budgetChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{ data: values, backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545"] }]
        },
        options: { responsive: true }
    });

      let advice = "";
    if (savings > 10000000) {
        advice = "Mulailah belajar manajemen risiko keuangan, diversifikasi aset, dan investasi properti.";
    } else if (savings > 5000000) {
        advice = "Anda bisa mulai berinvestasi di saham dan obligasi untuk jangka panjang.";
    } else if (savings > 500000) {
        advice = "Mulailah belajar investasi emas dan reksadana untuk memaksimalkan tabungan.";
    } else if (savings >= 1000000) {
        advice = "Keuangan stabil, tetap kontrol pengeluaran dan pertimbangkan investasi sederhana.";
    } else {
        // Untuk semua kondisi negatif (−Rp1 ke bawah)
        advice = "Kurangi pengeluaran yang tidak diperlukan dengan menerapkan frugal living.";
    }

    document.getElementById("summary").innerHTML = `
        <h3>Kesimpulan</h3>
        <p>Total Pengeluaran: <b>Rp ${totalExpenses.toLocaleString("id-ID")}</b></p>
        <p>Tabungan Bulanan: <b>Rp ${savings.toLocaleString("id-ID")}</b></p>
        <p>${advice}</p>
    `;
}
