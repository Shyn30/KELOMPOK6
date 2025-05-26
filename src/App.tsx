import React, { useState } from 'react';
import './App.css';

interface Pasangan {
  nama: string;
  umur: number;
  tinggi: number;
  hobi: string;
  jurusan: string;
  makanan: string;
  komunikasi: number;
}

function hitungKecocokan(a: Pasangan, b: Pasangan) {
  let skor = 0;
  const total = 7;
  if (a.nama[0].toLowerCase() === b.nama[0].toLowerCase()) skor++;
  if (Math.abs(a.umur - b.umur) <= 3) skor++;
  if (Math.abs(a.tinggi - b.tinggi) <= 10) skor++;
  const hobiA = a.hobi.split(',').map(h => h.trim().toLowerCase());
  const hobiB = b.hobi.split(',').map(h => h.trim().toLowerCase());
  if (hobiA.some(h => hobiB.includes(h) && h !== '')) skor++;
  if (a.jurusan.trim().toLowerCase() === b.jurusan.trim().toLowerCase()) skor++;
  if (a.makanan.trim().toLowerCase() === b.makanan.trim().toLowerCase()) skor++;
  if (Math.abs(a.komunikasi - b.komunikasi) <= 30) skor++;
  return { skor, total };
}

const defaultState: Pasangan = {
  nama: '', umur: 0, tinggi: 0, hobi: '', jurusan: '', makanan: '', komunikasi: 0
};

function App() {
  const [pria, setPria] = useState<Pasangan>(defaultState);
  const [wanita, setWanita] = useState<Pasangan>(defaultState);
  const [hasil, setHasil] = useState<{persen: number, status: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, jenis: 'pria' | 'wanita') => {
    const { name, value } = e.target;
    const setter = jenis === 'pria' ? setPria : setWanita;
    setter(prev => ({ ...prev, [name]: name === 'umur' || name === 'tinggi' || name === 'komunikasi' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { skor, total } = hitungKecocokan(pria, wanita);
    const persen = (skor / total) * 100;
    let status = '';
    if (persen >= 70) status = 'Sangat cocok!';
    else if (persen >= 50) status = 'Cukup cocok.';
    else status = 'Kurang cocok.';
    setHasil({ persen, status });
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Aplikasi Kecocokan Pasangan</h1>
      <form className="row g-4" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title mb-3">Data Laki-laki</h5>
            <InputForm data={pria} onChange={e => handleChange(e, 'pria')} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title mb-3">Data Perempuan</h5>
            <InputForm data={wanita} onChange={e => handleChange(e, 'wanita')} />
          </div>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-5">Cek Kecocokan</button>
        </div>
      </form>
      {hasil && (
        <div className="alert mt-4 mx-auto text-center" style={{maxWidth: 400, fontSize: '1.2rem', background: '#f8f9fa'}}>
          <b>Persentase kecocokan:</b> {hasil.persen.toFixed(2)}%<br/>
          <b>Status:</b> {hasil.status}
        </div>
      )}
    </div>
  );
}

function InputForm({ data, onChange }: { data: Pasangan, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }) {
  return (
    <>
      <div className="mb-2">
        <label className="form-label">Nama</label>
        <input type="text" className="form-control" name="nama" value={data.nama} onChange={onChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Umur</label>
        <input type="number" className="form-control" name="umur" value={data.umur || ''} onChange={onChange} min={0} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Tinggi Badan (cm)</label>
        <input type="number" className="form-control" name="tinggi" value={data.tinggi || ''} onChange={onChange} min={0} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Hobi <span className="text-muted">(pisahkan dengan koma)</span></label>
        <input type="text" className="form-control" name="hobi" value={data.hobi} onChange={onChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Jurusan Kuliah</label>
        <input type="text" className="form-control" name="jurusan" value={data.jurusan} onChange={onChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Makanan Kesukaan</label>
        <input type="text" className="form-control" name="makanan" value={data.makanan} onChange={onChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Lama Komunikasi per Hari (menit)</label>
        <input type="number" className="form-control" name="komunikasi" value={data.komunikasi || ''} onChange={onChange} min={0} required />
      </div>
    </>
  );
}

export default App;
