---
title: python自动填写网页表单
tags: python
author: zhangangs
date: 2020-2-21
---
每天都要在OA中填写每日身体情况反馈表，内容都是重复的，最重要的就是填写每天的体温，而我经常又忘记填写，琢磨着写个自动任务帮我搞定。

就简单的写个python定时任务，每天下午2：00定时帮我填一下表。

原理就是模拟人的操作方式，访问网站，点击登录，选择navbar，填写表单和保存表单等操作。

代码很简单，第一次做这个，代码写的不咋好，贴一下主要的代码，做一个简单的记录，代码如下所示：

**index.py**
``` python
import task
import schedule
import time
import datetime

print("执行开始！！！！")

schedule.every().day.at('14:00').do(task.taskFun)

print('执行时间：' + datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

while True:
    schedule.run_pending()
    time.sleep(1)

```


** task.py **

```python
import time

from selenium import webdriver

def taskFun():
    driver = webdriver.Chrome("C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")

    driver.set_window_size(800, 800)

    # 访问网页地址
    driver.get(url='http://********/?m=login')

    driver.implicitly_wait(10)

    # 输入用户名
    driver.find_element_by_xpath('//*[@id="loginview0"]/div[1]/div/input').send_keys('####')
    # 输入密码
    driver.find_element_by_xpath('//*[@id="loginview0"]/div[3]/div/input').send_keys('####')

    # 登录
    time.sleep(0.5)
    driver.find_element_by_xpath('/html/body/div/div[4]/form/div[4]/button').click()

    # nav选择
    time.sleep(3)
    driver.find_element_by_xpath('//*[@id="topmenudiv"]/span[3]').click()

    time.sleep(1)
    driver.find_element_by_css_selector("#menu_list_num410").click()

    time.sleep(1)
    # 点击新增按钮
    driver.find_element_by_xpath(
        '/html/body/table/tbody/tr/td[3]/div/div[4]/div/div[2]/div[1]/table/tbody/tr/td[1]/button').click()

    time.sleep(1)
    # 进入到iframe中选择元素
    driver.switch_to.frame("openinputiframe")

    # 填写数据
    driver.find_element_by_xpath('//*[@id="div_temperature_am"]/input').send_keys('36.5')
    driver.find_element_by_xpath('//*[@id="div_temperature_pm"]/input').send_keys('36.5')

    time.sleep(2)
    # 提交表单
    driver.find_element_by_xpath('//*[@id="AltS"]').click()

    time.sleep(2)
    # 退出程序
    driver.quit()

```

**使用方法**
```python
python index.py
```

完成，一直跑起来就可以了。
