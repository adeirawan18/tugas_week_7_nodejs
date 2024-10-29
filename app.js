const fs = require("node:fs")
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder");
            
        })
        rl.close()
    })
} 

// To Do : lanjutkan pembuatan logic disini 

// Tambahkan fitur di app.js

// Fitur untuk membuat file baru
app.makeFile = () => {
    rl.question("Masukkan nama file beserta ekstensi (contoh: file.txt): ", (fileName) => {
        fs.writeFile(__dirname + `/${fileName}`, '', (err) => {
            if (err) throw err;
            console.log(`File ${fileName} berhasil dibuat`);
        });
        rl.close();
    });
}

// Fitur untuk merapikan file berdasarkan ekstensi
app.extSorter = () => {
    const unorganizedFolder = __dirname + '/unorganize_folder';
    fs.readdir(unorganizedFolder, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const ext = file.split('.').pop();
            const destFolder = __dirname + `/${ext}`;
            if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder);

            fs.rename(`${unorganizedFolder}/${file}`, `${destFolder}/${file}`, (err) => {
                if (err) throw err;
                console.log(`File ${file} berhasil dipindahkan ke folder ${ext}`);
            });
        });
    });
}

// Fitur untuk membaca isi folder
app.readFolder = () => {
    rl.question("Masukkan nama folder yang ingin dibaca: ", (folderName) => {
        const folderPath = __dirname + `/${folderName}`;
        fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
            if (err) throw err;

            const fileInfo = files.map(file => {
                const stats = fs.statSync(`${folderPath}/${file.name}`);
                return {
                    namaFile: file.name,
                    extensi: file.name.split('.').pop(),
                    jenisFile: file.isFile() ? 'file' : 'folder',
                    tanggalDibuat: stats.birthtime.toISOString().split('T')[0],
                    ukuranFile: `${Math.ceil(stats.size / 1024)}kb`
                };
            });
            console.log(`Berhasil menampilkan isi dari folder ${folderName}:`, fileInfo);
        });
        rl.close();
    });
}

// Fitur untuk membaca isi file teks
app.readFile = () => {
    rl.question("Masukkan nama file yang ingin dibaca: ", (fileName) => {
        fs.readFile(__dirname + `/${fileName}`, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(`Isi dari file ${fileName}:\n\n${data}`);
        });
        rl.close();
    });
}


module.exports = app