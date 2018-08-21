from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import re
import json

def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200 
            and content_type is not None 
            and content_type.find('html') > -1)


def log_error(e):
    """
    It is always a good idea to log errors. 
    This function just prints them, but you can
    make it do anything.
    """
    print(e)

def scrape_page():

    print('Scraping page...')

    main_link = 'https://student.utm.utoronto.ca/calendar/depart_list.pl'
    main_html = simple_get(main_link)
    
    if not main_html:
        log_error('Main link is not valid: ' + main_link)
        return
    
    courses_by_dept = {}

    depart_link = simple_get('https://student.utm.utoronto.ca/calendar/depart_list.pl')
    
    if depart_link is None:
        return
    else:
        html = BeautifulSoup(depart_link, 'html.parser')
        for anchor in html.select('a'):
            if anchor['href'] and re.search('newdep_detail*', anchor['href']):
                courses_by_dept[anchor.text] = [[anchor['href'].split('=')[1]], []]
        
        print ('Finished getting departments')
        print ('Scraping courses...')
        
        for dept in courses_by_dept:
            print(dept + '..........', end="")
            courses_link = simple_get('https://student.utm.utoronto.ca/calendar/list_courses.pl?Depart=' + courses_by_dept[dept][0][0])
            html = BeautifulSoup(courses_link, 'html.parser')
            for p in html.select('p'):
                c_code = p.text[:8]
                c_name = p.text[9:p.text.find('(')].rstrip(' ')
                c_desc = p.next_sibling.next_sibling.text.replace('\n', ' ').strip(' ')
                c_dept = dept
                courses_by_dept[dept][1].append([c_code, c_name, c_dept, c_desc])
            
            print('Done')
        
        print(json.dumps(courses_by_dept['Linguistics'][1][11]))

    print('Scraping Completed')

def course_name():
    course_link = simple_get('https://student.utm.utoronto.ca/calendar/list_courses.pl?Depart=2')
    html = BeautifulSoup(course_link, 'html.parser')
    
    for p in html.select('p'):
        print(p.text[:8])
        dist_st = p.text.find('(')
        course_name = p.text[9:dist_st].rstrip(' ')
        print(course_name)
        course_desc = p.next_sibling.next_sibling.text.replace('\n', ' ').strip(' ')
        print(course_desc)
        print('------')

scrape_page()
