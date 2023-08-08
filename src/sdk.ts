
import axios from 'axios';
import { getSDK } from '@mokoko/sdk';


async function LooseFetchFn(url, init) {
	init.data = init.body;
	delete init.body;
	const res = await axios({
		url,
		...init,
	});
	return {
		status: res.status,
		statusText: res.statusText,
		json: () => res.data,
	};
}

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAyMTk1MTUifQ.ZgBPEfkHaqpVrhJT88zVTntU5uqV2L5j8oPL_qofETS0u1rgD8QzZmHRhCmYcD-DZX56X3cBzv0o-eCOg_p2HFh7Rg40XJb2axvIQa_0gTRpItRqhDqjPcMU1jeJgGhfQKwraw7Q1Et48OqIxOpUcA6psQ3ru2rEXxvmAnGWnI9fM55fQMfqoU6wI_zUfd2EnzCXPtl5FBzYqXYL5QHJR1xxT5PS1sfkRd5heOJyKChPuLbpRAHNSr46oaSUR_Hg4EnoVyaf4koQ1ScKXbF5IC4JP3VjhOpvq3XIP1oo5_W_V9Fjv1pBHx58eZT5XKraFCoH3_LmT_WbenKS2pwPEA';
const API_KEY2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDE1NzYifQ.T9Z3qEGPDF_5OzVFFty58wwazsZ84JpM4W_qSZ9B3nJ5IZitPD0PFO8WpAJa1TDeXnIG8fKkk1WkRKhMbq41V4SShOYvYq7xEgV5DExFv2Tsq8uE92t2sqf0nsbIiorgt4Fp9k-A1psnly3xI5VEQDSUP5PS3cUxPa2OPk-kW3nLWAwl0nALzVe_hNkSc8rBfODQ9Ds-76cG1gGkfFFRl16rk0Dmutpq0CRS8t8tCpw3EGWnJfMarqw58xlnqKbzCA_t-PbONroNKfa4oQ_wsPocU8ZdKPuZ1zEVyPGdUDf-qR1whvviB1h1M-VE0_QdOZTRPemb5Nq4Czslq_4f9w';
const API_KEY3 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDE1NzQifQ.XCNEbkAXFoE-xcEZ9dD8PVrNdASk3xbQG046yskBrc0sgaB_VPsjTTQAyMkFKVPUhgOmkIenD9YXMREfWyCg8JB3CvBD4JErKMKjyZKI8inaK_qWdkd3jkpqQTJjkRp_bkpixMezi2bEaQR7KyGYjoceyzplsBL-IHDCzddmv3VNAuw6sAQGMStVyEeHd6forylL09JSG8E1pacX86QPRgD3f1hvMUkX5_TKa7OuCk2uKOaibSkRGwfI4X_DRGNzVny9vxdOvCzFSvS4QCLhwgLH11xKq7XOQ0z9GJZbOjN-ygqSiw2zosPl3u5IVrFyj6ON5lIWd-W6EduQQNRsRQ;'
const API_KEY4 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDE1NzIifQ.OJyJ6zMmxqEvQu8A4Pr-bYWlp6DEjQjw7BZca6PXvoevoWFm7dYZhQr2WKbY3M_F0BwZ5lYxuma6cIENwktjiLoiYOT8Uu8hRfoL_-ulskdJM6RTsl8DV-IOoc-ySrkDEsYijmv2VrQrVLGTjLlNBEpoykrh4anDarc9RQok9ihQ-4dlxRz_UlNE2PHoUJaE7WwWf6XrUut5ai55x_2oYxjF-uFuP0GX90Pbc1kZXT3xP9IbbuAqriv-EMGqh2wrsUxySVATPvAp3n7cDKPkmjODZnXq8cE0EaNyT8jVs5Q98YLDM2so-5ltVJbfYShqvoWfzmQk-ItL6Uu_xIRBHw';
const API_KEY5 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDAyNDcifQ.IdGPYZbOFxd2g-413JKf8vASlETINeof1Bz1ctTa4Pq-FrdvZti3pg8GyQPVb9WtlJpQ0XQ8QH3SfdTYnQ9Seub7HjfwPEl7xdhSpAXF0jJ1SMukXAhW60XO58nmMoOVUWxbZ3TkAiQUMXkTxteQWY3gJCqGl0Giwo1jS6WnGQJdVjY-ZReSN2LcBZVrD08CrVZyvoUZjPo9opDtgdytGZCWL496SqgZljJsEnQE81-te1jOAyla7gsoudAjlRmEiZTVMtw5oIanbyF7UN0HMK48eZ1kst9kwfBoc3f7KQACFMYToQu0pOgdCsM9t-UNZS_H5_4q0yHCS-MMSKEDCA';

const sdk = getSDK({
	fetchFn: LooseFetchFn,
	apiKey: [
		API_KEY,
		API_KEY2,
		API_KEY3,
		API_KEY4,
		API_KEY5,
	],
});


export default sdk;