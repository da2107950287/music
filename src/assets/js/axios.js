import originAxios from 'axios'
import store from '../../store/index'
export function post(url, params,) {
	let option = {
		url,
		params,
	}
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: '/mustard',
			timeout: 5000,
			method: 'post'
		});
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			// config.data = qs.stringify(config.data)
			// console.log(config);

			// 4.等等
			if (localStorage.getItem("token")) {
				config.headers.token = localStorage.getItem("token");
			}
			store.dispatch('showLoading')
			return config
		}, err => {
			return err
		})
		instance.interceptors.response.use(response => {
			if (response.data.code == 501) {
				localStorage.clear();
			}
			store.dispatch('hideLoading')
			return response.data
		}, err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export function wxpost(url, params,) {
	let option = {
		url,
		params,
	}
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: '/access_token',
			timeout: 5000,
			method: 'post'
		});
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			// config.data = qs.stringify(config.data)
			// console.log(config);

			// 4.等等
			if (localStorage.getItem("token")) {
				config.headers.token = localStorage.getItem("token");
			}
			store.dispatch('showLoading')
			return config
		}, err => {
			return err
		})
		instance.interceptors.response.use(response => {
			if (response.data.code == 501) {
				localStorage.clear();
			}
			store.dispatch('hideLoading')
			return response.data
		}, err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export function uploadPost(url, data) {
	let option = {
		url,
		data,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: '/mustard',
			timeout: 5000,
			method: 'post',
		});
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			// config.data = qs.stringify(config.data)
			// console.log(config);

			// 4.等等
			if (localStorage.getItem("token")) {
				config.headers.token = localStorage.getItem("token");
			}
			store.dispatch('showLoading')
			return config
		}, err => {
			return err
		})

		instance.interceptors.response.use(response => {
			store.dispatch('hideLoading')
			return response.data
		}, err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

export function uploadPost1(url, data) {
	let option = {
		url,
		data,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: '/image',
			timeout: 5000,
			method: 'post',
		});
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			// config.data = qs.stringify(config.data)
			// console.log(config);

			// 4.等等
			if (localStorage.getItem("token")) {
				config.headers.token = localStorage.getItem("token");
			}
			store.dispatch('showLoading')
			return config
		}, err => {
			return err
		})

		instance.interceptors.response.use(response => {
			store.dispatch('hideLoading')
			return response.data
		}, err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
