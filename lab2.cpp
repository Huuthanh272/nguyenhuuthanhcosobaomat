#include <iostream>
using namespace std;

// Hàm tính GCD (ước chung lớn nhất)
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// Hàm Euclid mở rộng
int extended_euclid(int a, int b, int &x, int &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int x1, y1;
    int d = extended_euclid(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return d;
}

// Hàm tìm nghịch đảo modulo
int mod_inverse(int a, int m) {
    int x, y;
    int g = extended_euclid(a, m, x, y);
    if (g != 1) {
        return -1; // Không tồn tại nghịch đảo
    } else {
        return (x % m + m) % m; // Đảm bảo kết quả dương
    }
}

// Hàm chính
int main() {
    int a, m;
    cout << "Nhap a, m: ";
    cin >> a >> m;

    if (gcd(a, m) != 1) {
        cout << "Khong ton tai nghich dao modulo vi gcd(a, m) != 1.\n";
        return 0;
    }

    int inv = mod_inverse(a, m);
    cout << "Nghich dao cua " << a << " mod " << m << " la: " << inv << endl;
    cout << "Kiem tra: " << a << " * " << inv << " % " << m << " = " << (1LL * a * inv % m) << endl;

    return 0;
}
