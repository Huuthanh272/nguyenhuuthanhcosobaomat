#include <iostream>
#include <map>
#include <cmath>
#include <string>
using namespace std;

double calculate_entropy(const string& text) {
    map<char, int> freq;
    for (char c : text) freq[c]++;
    double entropy = 0.0;
    for (auto& pair : freq) {
        double p = (double)pair.second / text.size();
        entropy -= p * log2(p);
    }
    return entropy;
}

int main() {
    string input;
    cout << "Enter a string of characters: ";
    getline(cin, input);

    double H = calculate_entropy(input);
    const double max_entropy = log2(256); // Vì ASCII có 256 ký tự
    double R = max_entropy - H;

    cout << "Entropy: " << H << endl;
    cout << "Max Entropy: " << max_entropy << endl;
    cout << "Redundancy: " << R << endl;

    return 0;
}
